import * as React from "react";
import {
  CoreProvider,
  LocalizationProviderProps,
} from "@rcl2/primitives/core-ui";
import {
  SingleDatePickerProps,
  SingleDatePicker,
} from "@rcl2/primitives/date-picker";
import { IconButton, Button } from "@rcl2/primitives/button";
import { ClearSolidIcon, CalendarIcon } from "@rcl2/primitives/icon";

export interface DefaultDate {
  title: string;
  value: Date;
}

export interface DatePickerComponentProps extends SingleDatePickerProps {
  onClear?: () => void;
  localization: LocalizationProviderProps;
  theming: any;
  defaultDates?: DefaultDate[];
  onDefaultDateChosen?: (chosen: DefaultDate) => void;
  formatDate: (date: Date) => string | null;
}

const CustomSingleDatePicker: React.FC<SingleDatePickerProps> = ({
  id,
  required,
  i18n,
  ...rest
}: SingleDatePickerProps) => {
  return (
    <SingleDatePicker
      id={id}
      size="medium"
      i18n={i18n}
      required={required}
      {...rest}
    />
  );
};

export const DatePickerComponent: React.FC<DatePickerComponentProps> = (
  props
) => {
  const {
    localization,
    theming,
    value,
    defaultDates,
    onClear,
    onChange,
    formatDate,
    onDefaultDateChosen,
  } = props;
  return (
    <>
      <div className="date-picker-caption" />
      <div className="date-picker-selected">
        <CustomSingleDatePicker {...props} />
        {value && (
          <IconButton size="small" icon={ClearSolidIcon} onClick={onClear} />
          )}
      </div>
      {defaultDates?.map((defaultDate) => (
        <div key={defaultDate.title} className="date-picker-default">
          <span>
            <CalendarIcon className="date-picker-default--icon" />{" "}
            {defaultDate.title}
          </span>
          <Button
            displayType="borderless"
            onClick={() => {
              onChange?.(defaultDate.value);
              onDefaultDateChosen?.(defaultDate);
            }}
            >
            {formatDate(defaultDate.value)}
          </Button>
        </div>
      ))}
      </>
  );
};
