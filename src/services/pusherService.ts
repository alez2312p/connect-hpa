import Pusher from "pusher-js";

export const initPusher = () => {
  const random: string = Math.random().toString(36).slice(2);
  const channelName = `private-hc-${random}`;
  const pusherInstance = new Pusher(
    process.env.NEXT_PUBLIC_PUSHER_APP_ID as string,
    {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
      authEndpoint: process.env.NEXT_PUBLIC_PUSHER_AUTH,
    }
  );

  const qrData = `hc:${random}`;
  return { pusherInstance, channelName, qrData };
};

export const subscribeToChannel = (
  pusherInstance: Pusher,
  channelName: string,
  onSubscriptionSucceeded: Function
) => {
  let channel = pusherInstance.subscribe(channelName);
  channel.bind("pusher:subscription_succeeded", () => {
    onSubscriptionSucceeded();
  });
};
