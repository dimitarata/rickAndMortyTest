import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface StatusFilterProps {
  handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
}

export default function StatusFilterComponent({ handleFilterChange, filter }: StatusFilterProps) {
  return (
    <FormControl className="formControlStyle">
      <div className="flexDivRow">
        <div className="label">
          <FormLabel>
            Character status:
          </FormLabel>
        </div>
        <div>
          <RadioGroup
            value={filter}
            onChange={handleFilterChange}
            row
            name="row-radio-buttons-group"
          >
            <FormControlLabel value="" control={<Radio />} label="Any" />
            <FormControlLabel value="alive" control={<Radio />} label="Alive" />
            <FormControlLabel value="dead" control={<Radio />} label="Dead" />
            <FormControlLabel
              value="unknown"
              control={<Radio />}
              label="unknown"
            />
          </RadioGroup>
        </div>
      </div>
    </FormControl>
  );
};
