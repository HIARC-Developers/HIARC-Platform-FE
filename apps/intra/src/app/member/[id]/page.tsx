import { RestrictedPageGuard } from '@/components/restricted-page-guard';

export default function MemberProfilePage(): React.ReactElement {
  return (
    <RestrictedPageGuard>
      <div>Member Profile Page</div>
    </RestrictedPageGuard>
  );
}
