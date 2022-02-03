import { message } from "antd";

export const showErrorMessage = (content) => {
  return message.error({
    content,
  });
};

export const showSuccessMessage = (content) => {
  return  message.success({
    content,
  });
};

export const showWarningMessage = (content) => {
  return  message.warning({
    content,
  });
};
