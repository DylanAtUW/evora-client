import { useState } from "react";
import { initialize, shutdown } from "../apiClient"
import BeatLoader from 'react-spinners/BeatLoader';

function OnOff({initialized, setInitialized}) {

    const [shuttingDown, setShuttingDown] = useState(false);

    async function onInitialize() {
        console.log("Initializing Andor...")
        const msg = await initialize()
        console.log(msg)
        setInitialized(true)
    }

    async function onShutdown() {
        console.log("Shutting down Andor...")
        setShuttingDown(true)

        const msg = await shutdown()
        console.log(msg)
        setInitialized(false)
        setShuttingDown(false)
        // console.log("Pinging Filter Wheel Connection")
        // const msg = await getFilterWheelStatus()
        // console.log(msg.message)
    }

    return(
        <fieldset>
            <button disabled={initialized} onClick={onInitialize}>
                Initialize
            </button>
            <button disabled={!initialized} onClick={onShutdown}>
                { shuttingDown ? "Shutting Down ..." : "Shut Down" }
            </button>
            <BeatLoader
              cssOverride={{ verticalAlign: 'middle', alignContent: 'end' }}
              color="red"
              size={12}
              loading={shuttingDown}
              speedMultiplier={0.7}
            />
        </fieldset>
    )
}

export default OnOff;
