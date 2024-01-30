import { Box } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

type OptionType = {
  label: string;
  id: string;
};

type PropType = {
  placeholder: string;
  name: string;
  options: OptionType[];
  selectedOptions: string[];
  handleChange: (name: string, options: string | string[]) => void;
  multiSelect?: boolean;
};

export default function MultiSelectDropdown({
  placeholder,
  options,
  selectedOptions,
  name,
  handleChange,
  multiSelect = true,
}: PropType) {
  return (
    <Box>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{placeholder}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          name={name}
          multiple={multiSelect}
          value={selectedOptions}
          onChange={(event) =>
            handleChange(event.target.name, event.target.value)
          }
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) =>
            selected.length === 0 ? (
              <em>{placeholder}</em>
            ) : (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )
          }
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
