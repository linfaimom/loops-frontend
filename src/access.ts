/**
 * @see https://umijs.org/docs/max/access#access
 * */

// 直接这里写死，方便
const admins: string[] = ['linfengxiang01', 'huyuchao', 'hzlouchao', 'caoyuan05', 'xiaowucheng'];

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && admins.includes(currentUser.nickname),
  };
}
