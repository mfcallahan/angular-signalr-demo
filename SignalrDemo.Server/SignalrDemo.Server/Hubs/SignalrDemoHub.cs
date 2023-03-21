using Microsoft.AspNetCore.SignalR;
using SignalrDemo.Server.Interfaces;
using System.Diagnostics;

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
            var stopwatch = new Stopwatch();
            stopwatch.Start();

            int progressPercentage = 0;
            var random = new Random();

            // iterate through a loop 10 times, waiting a random number of milliseconds to
            // simulate long-runnign data processing before updating the progress bar
            for (int i = 0; i < 10; i++)
            {
                int waitTimeMilliseconds = random.Next(100, 1500);
                Thread.Sleep(waitTimeMilliseconds);

                // increment the progress bar by 10%
                Clients.Caller.UpdateProgressBar(progressPercentage += 10);
            }

            stopwatch.Stop();

            Clients.Caller.DisplayProgressMessage($"Data processing complete, elapsed time: {stopwatch.Elapsed.TotalSeconds:0.0} seconds.");
        }
    }
}

