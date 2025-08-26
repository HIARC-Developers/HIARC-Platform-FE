'use client';
import * as React from 'react';
import { Label } from '../label/label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { Input } from './input';
import Image from 'next/image';

interface LabeledInputProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  value: Date | null | [Date | null, Date | null];
  onChange(value: Date | null | [Date | null, Date | null]): void;
  placeholder?: string;
  rangeMode?: boolean;
  showTimeSelect?: boolean;
  timeIntervals?: number;
  error?: string;
  className?: string;
}

function LabeledCalanderInput({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
  rangeMode = false,
  showTimeSelect = false,
  timeIntervals = 15,
  error,
  className,
}: LabeledInputProps): React.ReactElement {
  const [startDate, endDate] = Array.isArray(value) ? value : [value, null];

  return (
    <div className={`flex w-full flex-col ${className}`}>
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <div className="relative w-full">
        <Image
          src="/shared-assets/Schedule.svg"
          alt="캘린더 아이콘"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
          width={16}
          height={16}
        />

        {rangeMode ? (
          <DatePicker
            selected={startDate}
            onChange={(date: [Date | null, Date | null]) => onChange(date)}
            selectsRange
            startDate={startDate}
            endDate={endDate}
            placeholderText={placeholder}
            className="h-11 pl-10"
            dateFormat={showTimeSelect ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
            popperPlacement="bottom-start"
            wrapperClassName="w-full"
            locale={ko}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            timeFormat="HH:mm"
            timeCaption="시간"
            customInput={<Input className=" border-gray-200" />}
          />
        ) : (
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => onChange(date)}
            placeholderText={placeholder}
            className="h-11 pl-10"
            dateFormat={showTimeSelect ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
            popperPlacement="bottom-start"
            wrapperClassName="w-full"
            locale={ko}
            showTimeSelect={showTimeSelect}
            timeIntervals={timeIntervals}
            timeFormat="HH:mm"
            timeCaption="시간"
            customInput={<Input className=" border-gray-200" />}
          />
        )}
      </div>
      {error && (
        <div className="mt-1">
          <Label size="sm" className="text-red">
            {error}
          </Label>
        </div>
      )}
    </div>
  );
}

export { LabeledCalanderInput };
