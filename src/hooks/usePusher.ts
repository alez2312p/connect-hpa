import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import { initPusher, subscribeToChannel } from "../services/pusherService";

export const usePusher = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [nameChannel, setNameChannel] = useState<string>("");
  const [qrData, setQrData] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setLoading(false);
        setIsModalOpen(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading, setIsModalOpen]);

  const handleConnect = () => {
    setLoading(true);
    const {
      pusherInstance,
      channelName,
      qrData: generatedQrData,
    } = initPusher();
    setPusher(pusherInstance);
    setNameChannel(channelName);
    setQrData(generatedQrData);

    subscribeToChannel(pusherInstance, channelName, () => {
      const data = { address: "userAddress", signature: "userSignature" };
      const userAddress = data?.address;
      const userSignature = data?.signature;
      const userChannelName = `private-${userAddress}`;
      console.log({ userChannelName, userSignature });

      const userChannel = pusherInstance.subscribe(userChannelName);
      console.log({ userChannel });

      userChannel.bind("pusher:subscription_succeeded", () => {
        const triggerData = {
          signature: userSignature,
          channel: channelName,
          domain: "localhost",
          name: "Hash Pass Admin Panel",
          orgHash: null as string,
        };
        let userData = userChannel.trigger(
          "client-hash-pass-request-verify",
          triggerData
        );
        console.log({
          event: "client-hash-pass-request-verify",
          userData,
          triggerData,
        });
      });

      console.log(data);
    });
  };

  const handleDisconnect = () => {
    if (pusher) {
      pusher.unsubscribe(nameChannel);
      pusher.disconnect();
      setPusher(null);
      setNameChannel("");
      setQrData(null);
      setLoading(false);
    }
  };

  return { qrData, loading, handleConnect, handleDisconnect };
};
