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
  imageUrl?: string;
  attendanceCount?: number;
  assignmentCount?: number;
  totalRounds?: number;
  roundStatuses?: RoundStatus[];
}

export function StudentListItem({
  name,
  imageUrl,
  attendanceCount,
  assignmentCount,
  totalRounds,
  roundStatuses = [],
}: StudentListItemProps): React.ReactElement {
  const [open, setOpen] = useState(false);

  // RoundStatus[]를 attendance, assignment 배열로 변환
  const attendance = roundStatuses.map((status) => status.attendanceCompleted === true);
  const assignment = roundStatuses.map((status) => status.assignmentCompleted === true);

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 px-5 py-4 transition">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar imageUrl={imageUrl} alt={name} />
          <Label size="lg" weight="medium">
            {name}
          </Label>
          <Button variant="secondary" size="xs">
            탈퇴
          </Button>
        </div>
        <div className="flex items-center">
          <Label>
            출석: {attendanceCount}/{totalRounds}
          </Label>
          <Label className="ml-6">
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
          <AttendanceTable
            className="mt-4"
            chunkSize={8}
            attendance={attendance}
            assignment={assignment}
          />
        </SlideFade>
      )}
    </div>
  );
}
