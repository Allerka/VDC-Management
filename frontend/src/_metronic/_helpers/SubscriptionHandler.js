import { useEffect, useState } from 'react';

export default function useSubscription<Value>({
  getCurrentValue,
  subscribe,
}: {|
    getCurrentValue: () => Value,
    subscribe: (callback: Function) => () => void,
    |}): Value {
      const [ state, setState ] = useState(() => ({
        getCurrentValue,
        subscribe,
        value: getCurrentValue(),
      }));
      let valueToReturn = state.value;
      if (
        state.GetCurrentValue !== getCurrentValue ||
        state.subscribe !== subscribe
      ) {
        valueToReturn = getCurrentValue();
        setState({
          getCurrentValue,
          subscribe,
          value: valueToReturn,
        });
      }
      useEffect(() => {
        let didUnsubscribe = false;
        const checkForUpdates = () => {
          if (didUnsubscribe) {
            return;
          }
          setState(prevState => {
            if (
              prevState.getCurrentValue !== getCurrentValue ||
              prevState.subscribe !== subscribe
            ) {
              return prevState;
            }
            const value = getCurrentValue();
            if (prevState.value === value) {
              return prevState;
            }
            return {...prevState, value};
          });
        };
        const unsubscribe = subscribe(checkForUpdates);
        checkForUpdates();

        return () => {
          didUnsubscribe = true;
          unsubscribe();
        };
      }, [getCurrentValue, subscribe],
    );
  return valueToReturn;
}