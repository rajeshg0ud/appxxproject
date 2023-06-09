The application is working fine.please follow the instructions given below:

1. Download the React App:
   - Visit the GitHub repository link (https://github.com/rajeshg0ud/appxxproject) in your web browser.
   - Click on the green "Code" button and select "Download ZIP".
   - Save the ZIP file to your desired location on your computer.
   - Extract the contents of the ZIP file to a separate folder.

2. Open the React App in Visual Studio Code:
   - Launch Visual Studio Code on your computer.
   - Click on "File" in the top menu and select "Open Folder".
   - Navigate to the folder where you extracted the React app files and select the folder to open it in Visual Studio Code.

3. Open the Integrated Terminal in Visual Studio Code:
   - In Visual Studio Code, click on "View" in the top menu and select "Terminal" or use the shortcut `Ctrl+` backtick (`).

4. Change Directory and Install Dependencies:
   - In the integrated terminal, ensure you are in the root folder of your React app. If not, use the `cd` command to navigate to the project folder. For example:
     ```
     cd appxxproject
     ```
   - Once you are in the project folder, run the following command to install the required dependencies, including `axios` and `chart.js`:
     ```
     npm install
     ```
   - This command will read the `package.json` file and install all the dependencies specified within it.

5. install axios, run the following command in the terminal:
    ```
     npm install axios
     ````
     This command will download and install the axios package from the npm registry and add it as a dependency to your project.
6.install chart.js, run the following command:
     ````
     npm install chart.js
    ````
    This command will download and install the chart.js 
7.  Watch the `db.json` file using JSON Server:
   - In the integrated terminal, still in the project folder, run the following command to start JSON Server and watch the `db.json` file on port 3033:
     ```
     npx json-server --watch db.json --port 3033
     ```
   - JSON Server will now serve the data from `db.json` at `http://localhost:3033`.

8. Start the React App:
   - In the integrated terminal, ensure you are still in the project folder.
   - Run the following command to start the React app:
     ```
     npm start
     ```
   - This will start the development server and launch the React app in your default browser at `http://localhost:3000`.
   - You can now access and interact with the React app.


9. The application features a navigation bar with four components:

-> Home: This is the landing page where the user can select a scenario from the available options.
   - The user can choose any of the scenarios they have created.
   - On the Home page, there is a "Start Simulation" button.
   - When the user clicks the "Start Simulation" button, the vehicles in the selected scenario will start moving according to their defined direction and speed.
   - The vehicles will continue moving until the specified scenario time is reached.

->  Add Scenario: This component allows the user to create a new scenario.
   - The user can provide the necessary details such as the scenario name, ID, and time.
   - Once the user submits the information, the new scenario will be added to the list of available scenarios.

->  All Scenarios: This component displays a list of all created scenarios.
   - The user can view and manage the existing scenarios, such as editing or deleting them.

->  Add Vehicle: This component enables the user to add a new vehicle to a selected scenario.
   - The user can specify the vehicle's ID, name, initial position (X and Y coordinates), speed, and direction.
   - When adding a vehicle, proper validation should be implemented to ensure that the positions do not exceed the size of the graph container on the Home page.

By following these guidelines, The application will allow users to select a scenario, start the simulation with moving vehicles, and provide the ability to create new scenarios and add vehicles with proper validation.

10. I am providing the app link https://appxxproject.vercel.app/ , where you can access and use the application. However, please note that the data, including scenarios and vehicles, is currently not accessible due to an issue with the JSON server. To overcome this issue and utilize all the features of the app, please follow the instructions provided earlier, which include setting up the JSON server and accessing the data.

