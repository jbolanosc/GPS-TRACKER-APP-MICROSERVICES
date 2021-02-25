export const errorResponse = (errorMsg: string) => {
  const response = {
    message: errorMsg,
    success: false,
  };
  return response;
};

export const successResponse = (successMsg: string, data: any) => {
  const response = {
    message: successMsg,
    success: true,
    data: data,
  };
  return response;
};

export function checkStatus(res: any) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  } else {
    console.log(res);
    throw new Error(res);
  }
}
