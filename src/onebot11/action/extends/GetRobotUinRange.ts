import BaseAction from '../BaseAction';
import { ActionName } from '../types';
import { NTQQUserApi } from '@/core/apis';
export class GetRobotUinRange extends BaseAction<void, Array<any>> {
  actionName = ActionName.GetRobotUinRange;

  protected async _handle(payload: void) {
    // console.log(await NTQQUserApi.getRobotUinRange());
    return await NTQQUserApi.getRobotUinRange();
  }
}
