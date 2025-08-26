import { StudyMember } from '@hiarc-platform/shared';
import { StudentListItem } from '@hiarc-platform/ui';

interface StudentListProps {
  studentList: StudyMember[];
}

export function StudentList({ studentList }: StudentListProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-4">
      {studentList.map((student) => (
        <StudentListItem
          key={student.memberId}
          name={student.memberName || ''}
          attendanceCount={student.attendanceCount || 0}
          assignmentCount={student.assignmentCount || 0}
          totalRounds={student.totalRounds || 0}
          roundStatuses={student.roundStatuses || []}
        />
      ))}
    </div>
  );
}
