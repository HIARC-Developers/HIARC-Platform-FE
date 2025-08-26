'use client';

import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';
import { Lecture } from '@hiarc-platform/shared';

function WeekChip({ week }: { week: number }): React.ReactElement {
  return (
    <div className="flex items-center justify-center rounded-full bg-gray-200 px-3 py-1 text-sm text-primary-300">
      {week}회차
    </div>
  );
}

// 간단한 버튼 컴포넌트들
function CreateCodeButton({ onClick }: { onClick(): void }): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick}>
      출석 생성
    </Button>
  );
}

function ShowCodeButton({ onClick }: { onClick(): void }): React.ReactElement {
  return (
    <Button variant="secondary" size="xs" onClick={onClick}>
      번호 확인
    </Button>
  );
}

function AttendanceCheckButton({
  onClick,
  disabled = false,
}: {
  onClick(): void;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick} disabled={disabled}>
      출석 체크
    </Button>
  );
}

function AttendanceDoneButton(): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" disabled>
      출석 완료
    </Button>
  );
}

function CreateAssignmentButton({ onClick }: { onClick(): void }): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick}>
      과제 등록
    </Button>
  );
}

function ShowAssignmentButton({ onClick }: { onClick(): void }): React.ReactElement {
  return (
    <Button variant="secondary" size="xs" onClick={onClick}>
      과제 확인
    </Button>
  );
}

function DoAssignmentButton({
  onClick,
  disabled = false,
}: {
  onClick(): void;
  disabled?: boolean;
}): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" onClick={onClick} disabled={disabled}>
      과제하기
    </Button>
  );
}

function AssignmentDoneButton(): React.ReactElement {
  return (
    <Button variant="fill_light" size="xs" disabled>
      과제 완료
    </Button>
  );
}

function DeleteButton({ onClick }: { onClick(): void }): React.ReactElement {
  return (
    <IconButton
      iconSrc="/shared-assets/Delete.svg"
      className="text-red-500 hover:text-red-700"
      aria-label="Delete Lecture"
      onClick={onClick}
    />
  );
}

interface LectureCardProps {
  lecture: Lecture;
  isAdmin?: boolean;
  isStudent?: boolean;
  onTitleClick?(): void;
  onCreateAttendanceClick?(onSuccess: () => void): void;
  onShowAttendanceClick?(): void;
  onCreateAssignmentClick?(onSuccess: () => void): void;
  onShowAssignmentClick?(): void;
  onAttendanceCheckClick?(onSuccess: () => void): void;
  onDoAssignmentClick?(onSuccess: () => void): void;
  onEditClick?(): void;
  onDeleteClick?(): void;
}

function MobileLectureListItem({
  lecture,
  isAdmin,
  isStudent,
  onTitleClick,
  onCreateAttendanceClick,
  onShowAttendanceClick,
  onCreateAssignmentClick,
  onShowAssignmentClick,
  onAttendanceCheckClick,
  onDoAssignmentClick,
  onEditClick,
  onDeleteClick,
}: LectureCardProps): React.ReactElement {
  const [isAttendanceCreated, setIsAttendanceCreated] = useState(
    lecture?.isAttendanceCodeExist || false
  );
  const [isAssignmentCreated, setIsAssignmentCreated] = useState(
    lecture?.isAssignmentExist || false
  );
  const [attendanceCompleted, setAttendanceCompleted] = useState(
    lecture?.isAttendanceCompleted || false
  );
  const [assignmentCompleted, setAssignmentCompleted] = useState(
    lecture?.isAssignmentCompleted || false
  );

  const buttons = [];

  if (isAdmin) {
    // Admin: 출석번호 생성, 과제 생성/수정
    if (!isAttendanceCreated) {
      buttons.push(
        <CreateCodeButton
          key="attendance"
          onClick={() => {
            onCreateAttendanceClick?.(() => setIsAttendanceCreated(true));
          }}
        />
      );
    } else {
      buttons.push(
        <ShowCodeButton key="attendance-show" onClick={() => onShowAttendanceClick?.()} />
      );
    }

    // 과제 관련 버튼
    if (!isAssignmentCreated) {
      buttons.push(
        <CreateAssignmentButton
          key="assignment"
          onClick={() => {
            onCreateAssignmentClick?.(() => setIsAssignmentCreated(true));
          }}
        />
      );
    } else {
      buttons.push(
        <ShowAssignmentButton key="assignment-show" onClick={() => onShowAssignmentClick?.()} />
      );
    }
  } else if (isStudent) {
    // Student: 출석번호 입력, 과제 확인
    // 출석 관련 버튼 - 항상 표시
    if (attendanceCompleted === true) {
      buttons.push(<AttendanceDoneButton key="attendance-done" />);
    } else {
      // attendanceCompleted가 false이거나 null인 경우
      buttons.push(
        <AttendanceCheckButton
          key="attendance-check"
          onClick={() => {
            onAttendanceCheckClick?.(() => setAttendanceCompleted(true));
          }}
          disabled={!isAttendanceCreated}
        />
      );
    }

    // 과제 관련 버튼 - 항상 표시
    if (assignmentCompleted === true) {
      buttons.push(<AssignmentDoneButton key="assignment-done" />);
    } else {
      // assignmentCompleted가 false이거나 null인 경우
      buttons.push(
        <DoAssignmentButton
          key="assignment-do"
          onClick={() => {
            onDoAssignmentClick?.(() => setAssignmentCompleted(true));
          }}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }
  // else: isStudent === false && isAdmin === false -> 아무 버튼도 표시하지 않음

  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 px-4 py-3">
      <div className=" flex items-center justify-between">
        <WeekChip week={lecture?.round || 0} />
        <div className="flex items-center gap-2">
          <Label size="md" className="text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
          <div className="flex gap-2">{buttons}</div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label
          size="lg"
          className="cursor-pointer underline decoration-gray-900 decoration-1 underline-offset-2 hover:opacity-70"
          onClick={onTitleClick}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
        {isAdmin && (
          <div className="ml-4 flex gap-4">
            <IconButton iconSrc="/shared-assets/Edit.svg" onClick={() => onEditClick?.()} />
            <DeleteButton onClick={() => onDeleteClick?.()} />
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopLectureCardListItem(props: LectureCardProps): React.ReactElement {
  const [isAttendanceCreated, setIsAttendanceCreated] = useState(
    props.lecture?.isAttendanceCodeExist || false
  );
  const [isAssignmentCreated, setIsAssignmentCreated] = useState(
    props.lecture?.isAssignmentExist || false
  );
  const [attendanceCompleted, setAttendanceCompleted] = useState(
    props.lecture?.isAttendanceCompleted
  );
  const [assignmentCompleted, setAssignmentCompleted] = useState(
    props.lecture?.isAssignmentCompleted
  );

  const {
    lecture,
    onCreateAttendanceClick,
    onShowAttendanceClick,
    onCreateAssignmentClick,
    onShowAssignmentClick,
    onAttendanceCheckClick,
    onDoAssignmentClick,
    onEditClick,
    onDeleteClick,
  } = props;

  const buttons = [];

  if (props.isAdmin) {
    // Admin: 출석번호 생성, 과제 생성/수정
    if (!isAttendanceCreated) {
      buttons.push(
        <CreateCodeButton
          key="attendance"
          onClick={() => {
            onCreateAttendanceClick?.(() => setIsAttendanceCreated(true));
          }}
        />
      );
    } else {
      buttons.push(
        <ShowCodeButton key="attendance-show" onClick={() => onShowAttendanceClick?.()} />
      );
    }

    // 과제 관련 버튼
    if (!isAssignmentCreated) {
      buttons.push(
        <CreateAssignmentButton
          key="assignment"
          onClick={() => {
            onCreateAssignmentClick?.(() => setIsAssignmentCreated(true));
          }}
        />
      );
    } else {
      buttons.push(
        <ShowAssignmentButton key="assignment-show" onClick={() => onShowAssignmentClick?.()} />
      );
    }
  } else if (props.isStudent) {
    // Student: 출석번호 입력, 과제 확인
    // 출석 관련 버튼 - 항상 표시
    if (attendanceCompleted === true) {
      buttons.push(<AttendanceDoneButton key="attendance-done" />);
    } else {
      // attendanceCompleted가 false이거나 null인 경우
      buttons.push(
        <AttendanceCheckButton
          key="attendance-check"
          onClick={() => {
            onAttendanceCheckClick?.(() => setAttendanceCompleted(true));
          }}
          disabled={!isAttendanceCreated}
        />
      );
    }

    // 과제 관련 버튼 - 항상 표시
    if (assignmentCompleted === true) {
      buttons.push(<AssignmentDoneButton key="assignment-done" />);
    } else {
      // assignmentCompleted가 false이거나 null인 경우
      buttons.push(
        <DoAssignmentButton
          key="assignment-do"
          onClick={() => {
            onDoAssignmentClick?.(() => setAssignmentCompleted(true));
          }}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }
  // else: isStudent === false && isAdmin === false -> 아무 버튼도 표시하지 않음

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between px-4 py-3',
        'rounded-sm border border-gray-200',
        'leading-normal'
      )}
    >
      <div className="flex gap-[13px]">
        <WeekChip week={lecture?.round || 0} />
        <Label
          size="lg"
          className="cursor-pointer underline decoration-gray-900 decoration-1 underline-offset-2 hover:opacity-70"
          onClick={props.onTitleClick}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
      </div>
      <div className="mr-4 flex">
        <div className="flex items-center gap-2">
          <div className="flex gap-2">{buttons}</div>
          <Label size="md" className="w-[80px] text-right text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
        </div>
        {props.isAdmin && (
          <div className="ml-4 flex gap-4">
            <IconButton iconSrc="/shared-assets/Edit.svg" onClick={() => onEditClick?.()} />
            <DeleteButton onClick={() => onDeleteClick?.()} />
          </div>
        )}
      </div>
    </div>
  );
}

export function LectureListItem({
  lecture,
  isAdmin = false,
  isStudent = false,
  onTitleClick,
  onCreateAttendanceClick,
  onShowAttendanceClick,
  onCreateAssignmentClick,
  onShowAssignmentClick,
  onAttendanceCheckClick,
  onDoAssignmentClick,
  onEditClick,
  onDeleteClick,
}: LectureCardProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      <div className="block md:hidden">
        <MobileLectureListItem
          lecture={lecture}
          isAdmin={isAdmin}
          isStudent={isStudent}
          onTitleClick={onTitleClick}
          onCreateAttendanceClick={onCreateAttendanceClick}
          onShowAttendanceClick={onShowAttendanceClick}
          onCreateAssignmentClick={onCreateAssignmentClick}
          onShowAssignmentClick={onShowAssignmentClick}
          onAttendanceCheckClick={onAttendanceCheckClick}
          onDoAssignmentClick={onDoAssignmentClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
      <div className="hidden md:block">
        <DesktopLectureCardListItem
          lecture={lecture}
          isAdmin={isAdmin}
          isStudent={isStudent}
          onTitleClick={onTitleClick}
          onCreateAttendanceClick={onCreateAttendanceClick}
          onShowAttendanceClick={onShowAttendanceClick}
          onCreateAssignmentClick={onCreateAssignmentClick}
          onShowAssignmentClick={onShowAssignmentClick}
          onAttendanceCheckClick={onAttendanceCheckClick}
          onDoAssignmentClick={onDoAssignmentClick}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
}
