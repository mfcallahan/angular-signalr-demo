using Microsoft.AspNetCore.SignalR;
using SignalrDemo.Server.Interfaces;

namespace SignalrDemo.Server.Hubs
{
    public class SignalrDemoHub : Hub
    {
        public void Hello()
        {
            Clients.Caller.DisplayMessage("Hello from the SignalrDemoHub!");
        }
    }
}
