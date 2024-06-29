/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { atom, Provider, useAtom } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { useRef, useEffect } from 'react';

const defaultPerson = {
  name: {
    first: 'Jane',
    last: 'Doe'
  },
  birth: {
    year: 2000,
    month: 'Jan',
    day: 1,
    time: {
      hour: 0,
      minute: 0
    }
  }
};

// Original atom.
const personAtom = atom(defaultPerson);

// Tracks person.name. Updated when person.name object changes, even
// if neither name.first nor name.last actually change.
const nameAtom = selectAtom(personAtom, (person) => person.name);

// Tracks person.birth. Updated when year, month, day, hour, or minute changes.
// Use of deepEquals means that this atom doesn't update if birth field is
// replaced with a new object containing the same data. E.g., if person is re-read
// from a database.
const birthAtom = selectAtom(
  personAtom,
  (person) => person.birth,
  (a, b) => JSON.stringify(a) === JSON.stringify(b)
);

const useCommitCount = () => {
  const rerenderCountRef = useRef(0);
  useEffect(() => {
    rerenderCountRef.current += 1;
  });
  return rerenderCountRef.current;
};

// Rerenders when nameAtom changes.
const DisplayName = () => {
  const [name] = useAtom(nameAtom);
  const n = useCommitCount();
  return (
    <div>
      Name: {name.first} {name.last}: re-rendered {n} times
    </div>
  );
};

// Re-renders when birthAtom changes.
const DisplayBirthday = () => {
  const [birth] = useAtom(birthAtom);
  const n = useCommitCount();
  return (
    <div>
      Birthday:
      {birth.month}/{birth.day}/{birth.year}: (re-rendered {n} times)
    </div>
  );
};

// Swap first and last names, triggering a change in nameAtom, but
// not in birthAtom.
const SwapNames = () => {
  const [person, setPerson] = useAtom(personAtom);
  const handleChange = () => {
    setPerson({
      ...person,
      name: { first: person.name.last, last: person.name.first }
    });
  };
  return <button onClick={handleChange}>Swap names</button>;
};

// Replace person with a deep copy, triggering a change in nameAtom, but
// not in birthAtom.
const CopyPerson = () => {
  const [person, setPerson] = useAtom(personAtom);
  const handleClick = () => {
    setPerson({
      name: { first: person.name.first, last: person.name.last },
      birth: {
        year: person.birth.year,
        month: person.birth.month,
        day: person.birth.day,
        time: {
          hour: person.birth.time.hour,
          minute: person.birth.time.minute
        }
      }
    });
  };
  return <button onClick={handleClick}>Replace person with a deep copy</button>;
};

// Changes birth year, triggering a change to birthAtom, but not nameAtom.
const IncrementBirthYear = () => {
  const [person, setPerson] = useAtom(personAtom);
  const handleClick = () => {
    setPerson({
      name: person.name,
      birth: { ...person.birth, year: person.birth.year + 1 }
    });
  };
  return <button onClick={handleClick}>Increment birth year</button>;
};

export default function App() {
  return (
    <div className="selectAtom">
      <p className="util">2. selectAtom</p>
      <Provider>
        <DisplayName />
        <DisplayBirthday />
        <div className="btn-grp">
          <SwapNames />
          <CopyPerson />
          <IncrementBirthYear />
        </div>
      </Provider>
    </div>
  );
}
