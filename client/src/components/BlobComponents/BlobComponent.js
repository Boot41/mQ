import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import ai from "../../assets/images/ai.gif";

const BlobComponent = forwardRef((props, ref) => {
  const [sectionId, setSectionId] = useState("");

  useImperativeHandle(
    ref,
    () => ({
      handleIdChange(id) {
        setSectionId(id);
        console.log("ID received:", id);
        console.log("ID received:", sectionId);
      },
    }),
    []
  );

  // Debounced handleClick function to avoid excessive API calls
  const handleClick = useCallback(async () => {
    if (!sectionId) {
      console.error("Section ID is not set");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/website-interaction/",
        {
          user_input: "Tell me about Think41's services",
          model_name: "4o-mini",
          section_id: sectionId,
          user_context: {},
        }
      );

      // Handle the response as needed
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error making API call:", error);
    }
  }, [sectionId]);

  return (
    <div>
      <div className="fixed bottom-24 right-24 w-24 h-24 z-50">
        <img
          src={ai}
          alt="AI Assistant"
          className="w-full h-full object-contain bg-blend-lighten"
          onClick={handleClick}
        />
      </div>
    </div>
  );
});

export default BlobComponent;
