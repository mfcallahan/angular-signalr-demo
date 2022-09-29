using Microsoft.AspNetCore.SignalR;
using SignalrDemo.Server.Interfaces;

namespace SignalrDemo.Server.Hubs
{
    public class SignalrDemoHub : Hub<ISignalrDemoHub>
    {
        public void Hello()
        {
            Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
        }
    }
}



