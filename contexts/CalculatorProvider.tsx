import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

export type Calculation = {
  number1: number;
  number2: number;
  operation: "+" | "-";
  result: number;
};

export const CalculatorContext = createContext({
    history: [] as Calculation[],
    setHistory: {} as Dispatch<SetStateAction<Calculation[]>>,
});

export default function CalculatorProvider({ children }: PropsWithChildren) {
    const [history, setHistory] = useState<Calculation[]>([]);

    return (<CalculatorContext.Provider value={{ history, setHistory }}>
        {children}
    </CalculatorContext.Provider>
    );
}

