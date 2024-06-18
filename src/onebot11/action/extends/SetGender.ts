
import BaseAction from '../BaseAction';
import { ActionName } from '../types';
import { NTQQUserApi } from '@/core/apis';
import { FromSchema, JSONSchema } from 'json-schema-to-ts';

const SchemaData = {
  type: 'object',
  properties: {
    gender: { type: 'number' },
  },
  required: ['gender'],
} as const satisfies JSONSchema;

type Payload = FromSchema<typeof SchemaData>;

export class SetGender extends BaseAction<Payload, any> {
  actionName = ActionName.SetGender;
  PayloadSchema = SchemaData;
  protected async _handle(payload: Payload) {
    let ret = await NTQQUserApi.setGender(payload.gender);
    return ret;
  }
}
