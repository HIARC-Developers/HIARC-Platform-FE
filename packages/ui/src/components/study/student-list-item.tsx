'use client';

import { useState } from 'react';
import { Avatar } from '../avatar';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';
import { AttendanceTable } from '../table/attendance-table';
import { SlideFade } from '../animation/slide-fade';

interface RoundStatus {
  round?: number | null;
  attendanceCompleted?: boolean | null;
  assignmentCompleted?: boolean | null;
}

interface StudentListItemProps {
  name: string;
  bojHandle?: string;
  imageUrl?: string;
  isAdmin?: boolean;
  attendanceCount?: number;
  assignmentCount?: number;
  totalRounds?: number;
  roundStatuses?: RoundStatus[];
  onWithdraw?(): void;
  onChangeStatus?(): void;
}

export function StudentListItem({
  name,
  bojHandle,
  imageUrl,
  isAdmin = false,
  attendanceCount,
  assignmentCount,
  totalRounds,
  roundStatuses = [],
  onWithdraw,
  onChangeStatus,
}: StudentListItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  const handleWithdraw = async (): Promise<void> => {
    if (onWithdraw) {
      onWithdraw();
    }
  };

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 px-5 py-4 transition">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar imageUrl={imageUrl} alt={name} />
          <Label size="md" weight="medium" className="md:text-lg">
            {name} ({bojHandle})
          </Label>
          {isAdmin && (
            <Button variant="secondary" size="xs" onClick={onChangeStatus}>
              강제 변경
            </Button>
          )}
          <Button variant="secondary" size="xs" onClick={handleWithdraw}>
            탈퇴
          </Button>
        </div>
        <div className="flex items-center">
          <Label className="hidden md:inline">
            출석: {attendanceCount}/{totalRounds}
          </Label>
          <Label className="ml-6 hidden md:inline">
            과제: {assignmentCount}/{totalRounds}
          </Label>
          <IconButton
            className="ml-4"
            size="lg"
            iconSrc={open ? '/shared-assets/CaretUp.svg' : '/shared-assets/CaretDown.svg'}
            aria-label="토글 상세"
            onClick={() => setOpen((toggle) => !toggle)}
          />
        </div>
      </div>

      {open && (
        <SlideFade key="table" className="w-full">
          <AttendanceTable className="mt-4" chunkSize={8} roundStatuses={roundStatuses} />
        </SlideFade>
      )}
    </div>
  );
}
