import { Children, Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

interface TimerContextType {
    Duration: number;
    setDuration: Dispatch<SetStateAction<number>>;
}

export const TimerContext = createContext<TimerContextType>({
    Duration: 10,
    setDuration: () => {},
});

interface TimerProviderProps {
    children: ReactNode;
}

const TimerProvider = ({ children }: TimerProviderProps ) => {
    const [Duration, setDuration] = useState(10)

    return (
        <TimerContext.Provider value={{ Duration, setDuration}}>
            {children}
        </TimerContext.Provider>
    )

}

export default TimerProvider;