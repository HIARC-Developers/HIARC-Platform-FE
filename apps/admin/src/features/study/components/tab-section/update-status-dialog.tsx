'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Button,
  AttendanceTable,
  Label,
} from '@hiarc-platform/ui';
import { useState, useEffect } from 'react';
import { useMemberStatus } from '../../hooks/use-member-status';
import { RoundStatus } from '@hiarc-platform/shared/src/types/study/round-status';
import { useUpdateMemberStatus } from '../../hooks/use-update-member-status';

interface UpdateStatusDialogProps {
  studyId: number;
  memberId: number;
}


export function UpdateStatusDialog({
  studyId,
  memberId,
}: UpdateStatusDialogProps): React.ReactElement {
  const [roundStatuses, setRoundStatuses] = useState<RoundStatus[]>([]);

  const { data } = useMemberStatus(studyId, memberId);
  const { mutate: updateMemberStatus } = useUpdateMemberStatus();

  // data가 로드되면 RoundStatus를 설정
  useEffect(() => {
    if (data?.roundStatuses) {
      setRoundStatuses(data.roundStatuses);
    }
  }, [data]);

  const handleSubmit = (): void => {
    updateMemberStatus({ studyId, memberId, roundStatuses });
  };

  return (
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>스터디 현황 변경</DialogTitle>
        </DialogHeader>
        <div className="mt-2 flex flex-col text-gray-700">
          <li>
            <Label size="lg">{data?.studyName}</Label>
          </li>
          <li>
            <Label size="lg">{data?.memberName}</Label>
          </li>
        </div>
        <AttendanceTable
          className="mt-6"
          editable={true}
          roundStatuses={roundStatuses}
          onValueChange={setRoundStatuses}
        />
        <Label
          className="my-10 flex w-full justify-center text-center text-gray-700"
          size="lg"
          weight="regular"
        >
          변경을 확정하시겠습니까? 신중히 확인해 주세요.
        </Label>

        <DialogFooter className="flex flex-row">
          <DialogClose asChild>
            <Button variant="secondary" size="sm" className="w-full">
              취소
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button className="w-full" variant="fill" size="sm" onClick={handleSubmit}>
              변경하기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
