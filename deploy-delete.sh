#!/usr/bin/env bash
# delete-deployments-gh.sh
# 사용법:
#   OWNER=org REPO=repo ENV=production DRY_RUN=1 ./delete-deployments-gh.sh
#   OWNER=org REPO=repo ./delete-deployments-gh.sh
# 사전조건: gh auth login 으로 인증 완료 또는 GITHUB_TOKEN 환경변수 설정

set -euo pipefail

: "${OWNER:?OWNER is required}"
: "${REPO:?REPO is required}"
ENV_FILTER="${ENV:-}"         # 특정 environment만 처리하고 싶으면 ENV=production
DRY_RUN="${DRY_RUN:-0}"       # 1이면 실제 삭제 대신 뭐 할지 출력만

echo "[info] Listing deployments for $OWNER/$REPO ..."
# --paginate 로 모든 페이지 순회, --jq 로 id와 environment만 추출
mapfile -t DEPLOYMENTS < <(gh api --paginate \
  "/repos/$OWNER/$REPO/deployments?per_page=100" \
  --jq '.[] | "\(.id) \(.environment)"')

if [ ${#DEPLOYMENTS[@]} -eq 0 ]; then
  echo "[info] No deployments found."
  exit 0
fi

for line in "${DEPLOYMENTS[@]}"; do
  DEPLOY_ID="$(awk '{print $1}' <<<"$line")"
  ENV_NAME="$(awk '{print $2}' <<<"$line")"

  if [[ -n "$ENV_FILTER" && "$ENV_FILTER" != "$ENV_NAME" ]]; then
    continue
  fi

  echo "----"
  echo "[info] Deployment #$DEPLOY_ID (env=$ENV_NAME)"

  if [[ "$DRY_RUN" == "1" ]]; then
    echo "[dry-run] Would POST inactive status, then DELETE deployment"
    continue
  fi

  # 1) inactive 상태 추가 (안전하게 비활성화)
  gh api -X POST \
    -H "Accept: application/vnd.github+json" \
    "/repos/$OWNER/$REPO/deployments/$DEPLOY_ID/statuses" \
    -f state=inactive >/dev/null
  echo "[ok] Marked as inactive"

  # 2) 삭제
  gh api -X DELETE \
    -H "Accept: application/vnd.github+json" \
    "/repos/$OWNER/$REPO/deployments/$DEPLOY_ID"
  echo "[ok] Deleted deployment #$DEPLOY_ID"
done

echo "[done] Finished."