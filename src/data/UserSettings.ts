import {atom} from 'recoil';
import {UserSettingsType} from '../types/UserSettings';

const UserSettingsAtom = atom<UserSettingsType>({
  key: 'UserSettingsAtom',
  default: {delay: 10000},
});

export default UserSettingsAtom;
