import {
    Grid,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
  } from "@mui/material";

  interface StatusFilterProps {
    handleFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    filter: String | null | undefined;
}

const StatusFilterComponent = (props:StatusFilterProps) => {
  return (
    <FormControl className="formControlStyle">
          <div className="flexDivRow">
            <div className="label">
              <FormLabel id="demo-row-radio-buttons-group-label">
                Character status:
              </FormLabel>
            </div>
            <div>
              <RadioGroup
                value={props.filter}
                onChange={props.handleFilterChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="any" control={<Radio />} label="Any" />
                <FormControlLabel
                  value="alive"
                  control={<Radio />}
                  label="Alive"
                />
                <FormControlLabel
                  value="dead"
                  control={<Radio />}
                  label="Dead"
                />
                <FormControlLabel
                  value="unknown"
                  control={<Radio />}
                  label="unknown"
                />
              </RadioGroup>
            </div>
          </div>
        </FormControl>
  )
}

export default StatusFilterComponent