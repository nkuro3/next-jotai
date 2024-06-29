'use client';

import { Provider, atom, createStore, getDefaultStore, useAtom, useStore } from 'jotai';
const yushaStore = createStore();

const defaultStore = getDefaultStore();

// グローバルなアトム
export const powerAtom = atom(1);

const Yusha = ({ name }: { name: string }) => {
  const [power, setPower] = useAtom(powerAtom);

  const incrementPower = () => setPower((p) => p + 1);

  return (
    <div className="card">
      <div>勇者名：{name}</div>
      <div>強さ：{power}</div>
      <button onClick={incrementPower}>パワーアップ</button>
    </div>
  );
};

const DummyYusha = ({ name }: { name: string }) => {
  type UseAtomParams = Parameters<typeof useAtom>;
  const useAtomDefault: typeof useAtom = (atom: UseAtomParams[0], options?: UseAtomParams[1]) =>
    useAtom(atom, {
      store: defaultStore,
      ...options
    });

  const store = useStore();

  const [power, setPower] = useAtomDefault(powerAtom);

  const incrementPower = () => setPower((p) => p + 1);

  return (
    <div className="card">
      <div>勇者名：{name}</div>
      <div>強さ：{power}</div>
      <button onClick={incrementPower}>パワーアップ</button>
    </div>
  );
};

const YushaList = () => {
  return (
    <div>
      <Provider store={yushaStore}>
        <Yusha name="勇者1" />
      </Provider>
      <Yusha name="勇者2（パワーリンク）" />
      <Yusha name="勇者3（パワーリンク）" />
      {/* storeを明示的に指定しなくてもOK 特定のstoreを共有したい場合は同じstoreを指定する */}
      <Provider>
        <Yusha name="勇者４" />
      </Provider>
      <Provider store={yushaStore}>
        <DummyYusha name="勇者５（ダミーリンク）" />
      </Provider>
      <Provider>
        <DummyYusha name="勇者６（ダミーリンク）" />
      </Provider>
      <DummyYusha name="勇者７（ダミーリンク）" />
    </div>
  );
};

export default YushaList;
