using System.Threading.Tasks;

namespace SignalrDemo.Server.Interfaces
{
    public interface ISignalrDemoHub
    {
        Task DisplayMessage(string messgage);
        Task UpdateProgressBar(int percentage);
    }
}
