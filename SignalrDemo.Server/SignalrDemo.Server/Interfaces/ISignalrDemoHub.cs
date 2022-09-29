namespace SignalrDemo.Server.Interfaces
{
    public interface ISignalrDemoHub
    {
        Task DisplayMessage(string message);
    }
}
