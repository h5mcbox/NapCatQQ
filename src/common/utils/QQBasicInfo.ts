import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { systemPlatform } from '@/common/utils/system';
import { logError } from '@/common/utils/log';

export const exePath = process.execPath;

export const pkgInfoPath = path.join(path.dirname(exePath), 'resources', 'app', 'package.json');
let configVersionInfoPath;

if (os.platform() !== 'linux') {
  configVersionInfoPath = path.join(path.dirname(exePath), 'resources', 'app', 'versions', 'config.json');
} else {
  const userPath = os.homedir();
  const appDataPath = path.resolve(userPath, './.config/QQ');
  configVersionInfoPath = path.resolve(appDataPath, './versions/config.json');
}

if (typeof configVersionInfoPath !== 'string') {
  throw new Error('Something went wrong when load QQ info path');
}

export { configVersionInfoPath };

type QQPkgInfo = {
  version: string;
  buildVersion: string;
  platform: string;
  eleArch: string;
}
type QQVersionConfigInfo = {
  baseVersion: string;
  curVersion: string;
  prevVersion: string;
  onErrorVersions: Array<any>;
  buildId: string;
}

let _qqVersionConfigInfo: QQVersionConfigInfo = {
  'baseVersion': '9.9.11-24568',
  'curVersion': '9.9.11-24568',
  'prevVersion': '',
  'onErrorVersions': [],
  'buildId': '24568'
};

if (fs.existsSync(configVersionInfoPath)) {
  try {
    const _ =JSON.parse(fs.readFileSync(configVersionInfoPath).toString());
    _qqVersionConfigInfo = Object.assign(_qqVersionConfigInfo, _);
  } catch (e) {
    logError('Load QQ version config info failed, Use default version', e);
  }
}

export const qqVersionConfigInfo: QQVersionConfigInfo = _qqVersionConfigInfo;
//V1_WIN_NQ_9.9.11_24568_GW_B
export const qqPkgInfo: QQPkgInfo = JSON.parse(fs.readFileSync(pkgInfoPath).toString());
// platform_type: 3,
// app_type: 4,
// app_version: '9.9.9-23159',
// qua: 'V1_WIN_NQ_9.9.9_23159_GW_B',
// appid: '537213764',
// platVer: '10.0.26100',
// clientVer: '9.9.9-23159',
//Android
//V1_AND_SQ_9.0.60_6478_YYB_D
// Linux
// app_version: '3.2.9-24568',
// qua: 'V1_LNX_NQ_3.2.9_24568_GW_B',

let _appid: string = '537226369';  // 默认为 Windows 平台的 appid
if (systemPlatform === 'linux') {
  _appid = '537226441';
}
// todo: mac 平台的 appid
export const appid = _appid;
