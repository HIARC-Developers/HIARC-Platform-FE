import Image from 'next/image';
import { cn } from '../../lib/utils';
import { Label } from '../label/label';

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
  attendance: boolean[];
  assignment: boolean[];
  chunkSize?: number;
  className?: string;
}

export function AttendanceTable({
  attendance,
  assignment,
  chunkSize = 8,
  className,
}: AttendanceTableProps): React.ReactElement {
  const maxWeeks = Math.max(attendance.length, assignment.length);
  const att = [...attendance, ...Array(Math.max(0, maxWeeks - attendance.length)).fill(false)];
  const ass = [...assignment, ...Array(Math.max(0, maxWeeks - assignment.length)).fill(false)];

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
                          {show ? <Label size="md">{`${weekNum + 1}주차`}</Label> : null}
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
                      return (
                        <td
                          key={idx}
                          className={`align-middle text-center${
                            idx !== chunkSize ? ' border-b border-gray-200' : ''
                          }`}
                        >
                          {chunkIdx * chunkSize + idx < maxWeeks ? (
                            <StyledCheckbox checked={checked} />
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
                      return (
                        <td key={idx} className="text-center align-middle">
                          {chunkIdx * chunkSize + idx < maxWeeks ? (
                            <StyledCheckbox checked={checked} />
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
                    <Label size="md">{`${idx + 1}주차`}</Label>
                  </td>
                  <td className="border-b border-gray-200 text-center align-middle">
                    <StyledCheckbox checked={att[idx]} />
                  </td>
                  <td className="border-b border-gray-200 text-center align-middle">
                    <StyledCheckbox checked={ass[idx]} />
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
