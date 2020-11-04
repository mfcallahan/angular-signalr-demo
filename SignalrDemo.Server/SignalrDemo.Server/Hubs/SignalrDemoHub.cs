using Microsoft.AspNetCore.SignalR;
using SignalrDemo.Server.Interfaces;
using System;
using System.Threading;

namespace SignalrDemo.Server.Hubs
{
    public class SignalrDemoHub : Hub<ISignalrDemoHub>
    {
        public void Hello()
        {
            Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
        }

        public void SimulateDataProcessing()
        {
            // set the progress bar to 0% initially
            int progressPercentage = 0;
            Clients.Caller.UpdateProgressBar(progressPercentage);

            var milliseconds = new[] { 500, 1000, 1500, 2000, 25000 };
            var random = new Random();

            // iterate through a loop 10 times, waiting a random number of milliseconds before 
            // updating the progress bar
            for (int i = 0; i < 10; i++)
            {
                int waitTime = milliseconds[random.Next(milliseconds.Length + 1)];
                Thread.Sleep(waitTime);

                // incriment the progress bar by 10%
                Clients.Caller.UpdateProgressBar(progressPercentage += 10);
            }
        }
    }
}

