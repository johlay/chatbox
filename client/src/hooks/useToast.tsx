import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { SnackbarKey, VariantType, useSnackbar } from "notistack";

type Toast = {
  autoHideDuration?: number;
  message: string;
  variant?: VariantType;
};

export const useToast = () => {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();

  const action = (key: SnackbarKey) => (
    <>
      <IconButton onClick={() => closeSnackbar(key)}>
        <CloseIcon />
      </IconButton>
    </>
  );

  const updateToast = ({
    autoHideDuration,
    message,
    variant = "error",
  }: Toast) =>
    enqueueSnackbar({
      action,
      autoHideDuration,
      message,
      variant,
    });

  return { updateToast };
};
