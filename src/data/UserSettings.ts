import {atom} from 'recoil';
import {UserSettingsType} from '../types/UserSettings';

const UserSettingsAtom = atom<UserSettingsType>({
  key: 'UserSettingsAtom',
  default: {delay: 5, manualRefresh: false},
});

export default UserSettingsAtom;
