import app from "./app";
import { port } from "./utils/exportedVariables";

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});