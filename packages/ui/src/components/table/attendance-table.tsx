import Image from 'next/image';
import { cn } from '../../lib/utils';
import { Label } from '../label/label';

interface RoundStatus {
  round?: number | null;
  attendanceCompleted?: boolean | null;
  assignmentCompleted?: boolean | null;
}

function StyledCheckbox({
  checked,
  onClick,
}: {
  checked: boolean;
  onClick?(): void;
}): React.ReactElement {
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onClick}
      className="inline-flex h-4 w-4 cursor-pointer items-center justify-center hover:opacity-80"
    >
      {checked ? (
        <Image src="/shared-assets/Checkbox.svg" alt="checked" width={16} height={16} />
      ) : (
        <div className="inline-block h-4 w-4 rounded-[2px] border border-gray-300 bg-white" />
      )}
    </div>
  );
}

interface AttendanceTableProps {
  chunkSize?: number;
  className?: string;
  editable?: boolean;
  roundStatuses: RoundStatus[];
  onValueChange?: (roundStatuses: RoundStatus[]) => void;
}

export function AttendanceTable({
  chunkSize = 8,
  className,
  editable = false,
  roundStatuses,
  onValueChange,
}: AttendanceTableProps): React.ReactElement {
  const maxWeeks = roundStatuses.length;
  
  // RoundStatus에서 boolean 배열로 변환
  const att = roundStatuses.map(status => status.attendanceCompleted === true);
  const ass = roundStatuses.map(status => status.assignmentCompleted === true);

  const handleAttendanceChange = (index: number, checked: boolean): void => {
    if (!editable || !onValueChange) return;

    const newRoundStatuses = [...roundStatuses];
    newRoundStatuses[index] = {
      ...newRoundStatuses[index],
      attendanceCompleted: checked,
    };
    onValueChange(newRoundStatuses);
  };

  const handleAssignmentChange = (index: number, checked: boolean): void => {
    if (!editable || !onValueChange) return;

    const newRoundStatuses = [...roundStatuses];
    newRoundStatuses[index] = {
      ...newRoundStatuses[index],
      assignmentCompleted: checked,
    };
    onValueChange(newRoundStatuses);
  };

  const numChunks = Math.ceil(maxWeeks / chunkSize);
  const getChunk = (arr: boolean[], idx: number): boolean[] => {
    const start = idx * chunkSize;
    return arr.slice(start, start + chunkSize);
  };

  return (
    <div className={cn('w-full', className)}>
      {/* 모바일: chunkSize 단위 가로 테이블 */}
      <div className="hidden md:block">
        {Array.from({ length: numChunks }).map((_, chunkIdx) => {
          const attArr = getChunk(att, chunkIdx);
          const assArr = getChunk(ass, chunkIdx);
          return (
            <div
              key={chunkIdx}
              className="mb-6 w-full overflow-x-auto rounded-lg border border-gray-200"
            >
              <table className="w-full table-fixed border-separate border-spacing-0 text-center">
                <colgroup>
                  {Array.from({ length: chunkSize }).map((_, idx) => (
                    <col key={idx} />
                  ))}
                </colgroup>
                <thead>
                  <tr>
                    <th className="bg-gray-100 text-center align-middle font-medium"></th>
                    {Array.from({ length: chunkSize }).map((_, idx) => {
                      const weekNum = chunkIdx * chunkSize + idx;
                      const show = weekNum < maxWeeks;
                      return (
                        <th
                          key={idx}
                          className={'bg-gray-100 px-4 py-2.5 text-center align-middle'}
                        >
                          {show && roundStatuses[weekNum] ? (
                            <Label size="md">{`${roundStatuses[weekNum].round}주차`}</Label>
                          ) : null}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-gray-100 py-2.5 text-center align-middle font-bold">
                      <Label size="md" weight="bold">
                        출석
                      </Label>
                    </td>
                    {Array.from({ length: chunkSize }).map((_, idx) => {
                      const checked = attArr[idx];
                      const weekIndex = chunkIdx * chunkSize + idx;
                      return (
                        <td
                          key={idx}
                          className={`align-middle text-center${
                            idx !== chunkSize ? ' border-b border-gray-200' : ''
                          }`}
                        >
                          {weekIndex < maxWeeks ? (
                            <StyledCheckbox
                              checked={checked}
                              onClick={
                                editable
                                  ? () => handleAttendanceChange(weekIndex, !checked)
                                  : undefined
                              }
                            />
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="bg-gray-100 py-2.5 text-center align-middle font-bold">
                      <Label size="md" weight="bold">
                        과제
                      </Label>
                    </td>
                    {Array.from({ length: chunkSize }).map((_, idx) => {
                      const checked = assArr[idx];
                      const weekIndex = chunkIdx * chunkSize + idx;
                      return (
                        <td key={idx} className="text-center align-middle">
                          {weekIndex < maxWeeks ? (
                            <StyledCheckbox
                              checked={checked}
                              onClick={
                                editable
                                  ? () => handleAssignmentChange(weekIndex, !checked)
                                  : undefined
                              }
                            />
                          ) : null}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      {/* 데스크톱: 모든 주차를 한 번에 세로로, 출석/과제가 가로 */}
      <div className="block md:hidden">
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full table-fixed border-separate border-spacing-0 text-center">
            <thead>
              <tr>
                <th className="bg-gray-100 text-center align-middle font-medium"></th>
                <th className="bg-gray-100 px-4 py-2.5 text-center align-middle">
                  <Label size="md" weight="bold">
                    출석
                  </Label>
                </th>
                <th className="bg-gray-100 px-4 py-2.5 text-center align-middle">
                  <Label size="md" weight="bold">
                    과제
                  </Label>
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxWeeks }).map((_, idx) => (
                <tr key={idx}>
                  <td className="bg-gray-100 py-2.5 text-center align-middle font-bold">
                    <Label size="md">
                      {roundStatuses[idx] ? `${roundStatuses[idx].round}주차` : `${idx + 1}주차`}
                    </Label>
                  </td>
                  <td className="border-b border-gray-200 text-center align-middle">
                    <StyledCheckbox
                      checked={att[idx]}
                      onClick={editable ? () => handleAttendanceChange(idx, !att[idx]) : undefined}
                    />
                  </td>
                  <td className="border-b border-gray-200 text-center align-middle">
                    <StyledCheckbox
                      checked={ass[idx]}
                      onClick={editable ? () => handleAssignmentChange(idx, !ass[idx]) : undefined}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
