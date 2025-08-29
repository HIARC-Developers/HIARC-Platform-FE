'use client';
import { RecruitSummary } from './recruit-bar/recruitment-summary';
import { useState } from 'react';
import {
  Button,
  DialogUtil,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@hiarc-platform/ui';
import { useSelectedSemester } from '@/shared/hooks/use-semester-store';
import { useRecruitment } from '@/features/recruitment/hooks/query/use-recruitment';
import { RecruitStartDialog } from './recruit-modal/recruit-start-dialog';
import { RecruitCompleteDialog } from './recruit-modal/recruit-complete-dialog';
import { RecruitInformationDialog } from './recruit-modal/recruit-information-dialog';
import Image from 'next/image';
import { useRecruitMembers } from '@/features/recruitment/hooks/query/use-recruit-members';
import { MemberRecruitTable } from '../../member-recruit-table';
import { useDownloadApplicantExcel } from '@/features/recruitment/hooks/mutation/use-download-applicant-excel';

export function RecruitManageSection(): React.ReactElement {
  const [open, setOpen] = useState(false);
  // 페이지네이션 상태
  const [page, setPage] = useState(0);

  // 선택된 학기 정보 가져오기
  const { selectedSemesterId, selectedSemester } = useSelectedSemester();

  const { mutate: downloadExcel } = useDownloadApplicantExcel();

  // 모집 정보 가져오기
  const { data: recruitmentInfo } = useRecruitment(Number(selectedSemesterId));

  // 모집 리스트 데이터 가져오기
  const { data: recruitmentData } = useRecruitMembers({
    semesterId: Number(selectedSemesterId) || 0,
    page,
    size: 10,
  });

  // 모집 상태 확인 (API에서 가져온 isRecruit 값 사용)
  const isRecruitmentExist = recruitmentInfo?.isRecruitmentExist || false;
  const isApplicationStatusEditable = recruitmentInfo?.isApplicationStatusEditable || false;

  //모집중이 아닐때
  if (!isRecruitmentExist) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-between py-[30%]">
        <div className="flex w-[344px] flex-col items-center gap-6">
          <Label size="lg">현재는 학회원 모집이 진행되고 있지 않습니다.</Label>
          <Button
            onClick={() => {
              DialogUtil.showComponent(<RecruitStartDialog isRecruit={isRecruitmentExist} />);
            }}
          >
            모집 시작하기
          </Button>
        </div>
      </div>
    );
  }
  //모집중일때
  return (
    <div className="flex w-full flex-col gap-4">
      <RecruitSummary
        startDate={recruitmentInfo?.startDate}
        endDate={recruitmentInfo?.endDate}
        semesterType={selectedSemester?.semesterType ?? 'FIRST'}
      />
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          className="mr-4"
          onClick={() => downloadExcel(Number(selectedSemesterId))}
        >
          명단 다운로드
        </Button>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button className="flex cursor-pointer gap-2 rounded-md bg-primary-200 px-4 py-2 transition-all duration-200 hover:opacity-70">
              <Label size="md" weight="regular" className="cursor-pointer text-white">
                모집문구 관리
              </Label>
              <Image src="/shared-assets/Down.svg" alt="down" width={11} height={7} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-[190px] p-3" align="end">
            <button
              className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-md hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                DialogUtil.showComponent(
                  <RecruitCompleteDialog
                    generalDescription={recruitmentInfo?.generalDescription || ''}
                    militaryDescription={recruitmentInfo?.militaryDescription || ''}
                  />
                );
              }}
            >
              학회 가입 완료
            </button>
            <button
              className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-md hover:bg-gray-100"
              onClick={() => {
                setOpen(false);
                DialogUtil.showComponent(
                  <RecruitInformationDialog
                    greetingDescription={recruitmentInfo?.greetingDescription || ''}
                  />
                );
              }}
            >
              안내사항
            </button>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-md">
          <div>신청 명단 총 {recruitmentData?.totalElements}건</div>
        </div>
        <MemberRecruitTable
          pageableModel={recruitmentData}
          onPageChange={(pageNumber) => setPage(pageNumber - 1)}
          showApprovalButton={isApplicationStatusEditable}
        />
      </div>
    </div>
  );
}
