import { Prediction } from "./Prediction";
export const GestureInitializer = async (setIsLoading) => {
  const predictPromise = Prediction.init();

  console.log("Initialize game...");

  Promise.all([predictPromise]).then((result) => {
    console.log("Initialization finished");
    setIsLoading(true);
  });
};
