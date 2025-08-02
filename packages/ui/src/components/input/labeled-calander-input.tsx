'use client';
import * as React from 'react';
import { Label } from '../label/label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { Input } from './input';

interface LabeledInputProps {
  label: string;
  showLabel?: boolean;
  required?: boolean;
  value: Date | null;
  onChange(value: Date | null): void;
  placeholder?: string;
}

function LabeledCalanderInput({
  placeholder,
  label,
  showLabel = true,
  required = false,
  value,
  onChange,
}: LabeledInputProps): React.ReactElement {
  return (
    <div className="flex w-full flex-col">
      {showLabel && (
        <div className="mb-2 flex items-center">
          <Label weight="medium" size="md">
            {label}
          </Label>
          {required && <span className="relative -top-[2px] ml-0.5 text-red">*</span>}
        </div>
      )}
      <div className="relative w-full">
        <img
          src="/Calander.svg"
          alt="캘린더 아이콘"
          className=" absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2"
          width={16}
          height={16}
        />

        <DatePicker
          selected={value}
          onChange={onChange}
          placeholderText={placeholder}
          className=" h-11 pl-10"
          dateFormat="yyyy-MM-dd"
          popperPlacement="bottom-start"
          wrapperClassName="w-full"
          locale={ko}
          customInput={<Input className="border-gray-200" />}
        />
      </div>
    </div>
  );
}

export { LabeledCalanderInput };
