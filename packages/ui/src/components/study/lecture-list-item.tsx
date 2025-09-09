'use client';

import { cn } from '../../lib/utils';
import { Button } from '../button';
import { IconButton } from '../icon-button';
import { Label } from '../label/label';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
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
      과제 하기
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
  const isAttendanceCreated = lecture?.isAttendanceCodeExist || false;
  const isAssignmentCreated = lecture?.isAssignmentExist || false;
  const attendanceCompleted = lecture?.isAttendanceCompleted || false;
  const assignmentCompleted = lecture?.isAssignmentCompleted || false;

  // 출석 관련 버튼만 상단에 배치 (Student일 때만)
  const attendanceButtons = [];
  // 과제 관련 버튼은 하단에 배치 (Student일 때만)
  const assignmentButton = [];

  if (isStudent) {
    // 출석 관련 버튼
    if (attendanceCompleted === true) {
      attendanceButtons.push(<AttendanceDoneButton key="attendance-done" />);
    } else {
      attendanceButtons.push(
        <AttendanceCheckButton
          key="attendance-check"
          onClick={() => {
            onAttendanceCheckClick?.(() => {});
          }}
          disabled={!isAttendanceCreated}
        />
      );
    }

    // 과제 관련 버튼
    if (assignmentCompleted === true) {
      assignmentButton.push(<AssignmentDoneButton key="assignment-done" />);
    } else {
      assignmentButton.push(
        <DoAssignmentButton
          key="assignment-do"
          onClick={() => {
            onDoAssignmentClick?.(() => {});
          }}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }
  // else: isStudent === false && isAdmin === false -> 아무 버튼도 표시하지 않음

  const handleMoreClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const renderAdminMenuItems = () => {
    const menuItems = [];

    // 출석 관련 메뉴
    if (!isAttendanceCreated) {
      menuItems.push(
        <button
          key="create-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCreateAttendanceClick?.(() => {});
          }}
        >
          <Label className="cursor-pointer">출석 생성</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onShowAttendanceClick?.();
          }}
        >
          <Label className="cursor-pointer">번호 확인</Label>
        </button>
      );
    }

    // 과제 관련 메뉴
    if (!isAssignmentCreated) {
      menuItems.push(
        <button
          key="create-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCreateAssignmentClick?.(() => {});
          }}
        >
          <Label className="cursor-pointer">과제 등록</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onShowAssignmentClick?.();
          }}
        >
          <Label className="cursor-pointer">과제 확인</Label>
        </button>
      );
    }

    // 수정, 삭제 메뉴
    menuItems.push(
      <button
        key="edit"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick?.();
        }}
      >
        <Label className="cursor-pointer">수정</Label>
      </button>
    );

    menuItems.push(
      <button
        key="delete"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick?.();
        }}
      >
        <Label className="cursor-pointer">삭제</Label>
      </button>
    );

    return menuItems;
  };

  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-gray-200 px-4 py-3">
      <div className=" flex items-center justify-between">
        <WeekChip week={lecture?.round || 0} />
        <div className="flex items-center gap-2">
          <Label size={lecture?.place ? 'md' : 'sm'} className="text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
          {isStudent && <div className="flex gap-2">{attendanceButtons}</div>}
          {isAdmin && (
            <Popover>
              <PopoverTrigger asChild>
                <IconButton iconSrc="/shared-assets/More.svg" size="sm" onClick={handleMoreClick} />
              </PopoverTrigger>
              <PopoverContent className="w-32 p-1" align="end">
                <div className="flex flex-col">{renderAdminMenuItems()}</div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Label
          size="lg"
          className={cn(
            (isStudent || isAdmin) && 'cursor-pointer hover:opacity-70',
            (isStudent || isAdmin) &&
              'underline decoration-gray-900 decoration-1 underline-offset-2'
          )}
          onClick={isStudent || isAdmin ? onTitleClick : undefined}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
        {isStudent && <div className="flex gap-2">{assignmentButton}</div>}
      </div>
    </div>
  );
}

function DesktopLectureCardListItem(props: LectureCardProps): React.ReactElement {
  const isAttendanceCreated = props.lecture?.isAttendanceCodeExist || false;
  const isAssignmentCreated = props.lecture?.isAssignmentExist || false;
  const attendanceCompleted = props.lecture?.isAttendanceCompleted;
  const assignmentCompleted = props.lecture?.isAssignmentCompleted;

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

  // 출석 관련 버튼만 메인 영역에 배치 (Student일 때만)
  const attendanceButtons = [];
  // 과제 관련 버튼은 제목 옆에 배치 (Student일 때만)
  const assignmentButton = [];

  if (props.isStudent) {
    // 출석 관련 버튼
    if (attendanceCompleted === true) {
      attendanceButtons.push(<AttendanceDoneButton key="attendance-done" />);
    } else {
      attendanceButtons.push(
        <AttendanceCheckButton
          key="attendance-check"
          onClick={() => {
            onAttendanceCheckClick?.(() => {});
          }}
          disabled={!isAttendanceCreated}
        />
      );
    }

    // 과제 관련 버튼
    if (assignmentCompleted === true) {
      assignmentButton.push(<AssignmentDoneButton key="assignment-done" />);
    } else {
      assignmentButton.push(
        <DoAssignmentButton
          key="assignment-do"
          onClick={() => {
            onDoAssignmentClick?.(() => {});
          }}
          disabled={!isAssignmentCreated}
        />
      );
    }
  }

  const handleMoreClick = (event: React.MouseEvent): void => {
    event.stopPropagation();
  };

  const renderAdminMenuItems = () => {
    const menuItems = [];

    // 출석 관련 메뉴
    if (!isAttendanceCreated) {
      menuItems.push(
        <button
          key="create-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCreateAttendanceClick?.(() => {});
          }}
        >
          <Label className="cursor-pointer">출석 생성</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-attendance"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onShowAttendanceClick?.();
          }}
        >
          <Label className="cursor-pointer">번호 확인</Label>
        </button>
      );
    }

    // 과제 관련 메뉴
    if (!isAssignmentCreated) {
      menuItems.push(
        <button
          key="create-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onCreateAssignmentClick?.(() => {});
          }}
        >
          <Label className="cursor-pointer">과제 등록</Label>
        </button>
      );
    } else {
      menuItems.push(
        <button
          key="show-assignment"
          className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
          onClick={(e) => {
            e.stopPropagation();
            onShowAssignmentClick?.();
          }}
        >
          <Label className="cursor-pointer">과제 확인</Label>
        </button>
      );
    }

    // 수정, 삭제 메뉴
    menuItems.push(
      <button
        key="edit"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          onEditClick?.();
        }}
      >
        <Label className="cursor-pointer">수정</Label>
      </button>
    );

    menuItems.push(
      <button
        key="delete"
        className="mx-1 my-1 rounded-sm px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100"
        onClick={(e) => {
          e.stopPropagation();
          onDeleteClick?.();
        }}
      >
        <Label className="cursor-pointer">삭제</Label>
      </button>
    );

    return menuItems;
  };
  // else: isStudent === false && isAdmin === false -> 아무 버튼도 표시하지 않음

  return (
    <div
      className={cn(
        'flex w-full items-center justify-between px-4 py-3',
        'rounded-sm border border-gray-200',
        'leading-normal'
      )}
    >
      <div className="flex items-center gap-[13px]">
        <WeekChip week={lecture?.round || 0} />
        <Label
          size="lg"
          className={cn(
            (props.isStudent || props.isAdmin) &&
              'cursor-pointer underline decoration-gray-900 decoration-1 underline-offset-2 hover:opacity-70'
          )}
          onClick={props.isStudent || props.isAdmin ? props.onTitleClick : undefined}
        >
          {lecture?.title || '강의 제목 없음'}
        </Label>
      </div>
      <div className="mr-4 flex">
        <div className="flex items-center gap-2">
          {props.isStudent && (
            <>
              <div className="flex gap-2">{attendanceButtons}</div>
              <div className="flex gap-2">{assignmentButton}</div>
            </>
          )}
          {props.isAdmin && (
            <>
              {/* 출석 관련 버튼 */}
              {!isAttendanceCreated ? (
                <CreateCodeButton
                  onClick={() => {
                    onCreateAttendanceClick?.(() => {});
                  }}
                />
              ) : (
                <ShowCodeButton onClick={() => onShowAttendanceClick?.()} />
              )}

              {/* 과제 관련 버튼 */}
              {!isAssignmentCreated ? (
                <CreateAssignmentButton
                  onClick={() => {
                    onCreateAssignmentClick?.(() => {});
                  }}
                />
              ) : (
                <ShowAssignmentButton onClick={() => onShowAssignmentClick?.()} />
              )}
            </>
          )}
          <Label size={lecture?.place ? 'md' : 'sm'} className="w-[80px] text-right text-gray-700">
            {lecture?.place || '강의실 정보 없음'}
          </Label>
        </div>
        {props.isAdmin && (
          <div className="ml-2 flex gap-2">
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
