import { useEffect, useState } from "react";
import { sendLabelsRequest } from "../../api/LabelAPI";

const useLabelLogic = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    sendLabelsRequest().then((data) => setLabels(data));
  }, []);

};
