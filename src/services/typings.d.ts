declare namespace API {
  type CommonResponse<T = any> = {
    code: number;
    msg: string;
    data: T;
  };
}
