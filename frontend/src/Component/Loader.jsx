import React from "react";

export default function Loader() {
  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
      <div class="spinner-border text-primary" role="status">
      </div>
    </div>
  );
}
