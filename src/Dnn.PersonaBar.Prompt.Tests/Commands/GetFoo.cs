using Dnn.PersonaBar.Prompt.Attributes;
using Dnn.PersonaBar.Prompt.Common;
using Dnn.PersonaBar.Prompt.Interfaces;
using System;
using Dnn.PersonaBar.Prompt.Models;

namespace Mynamespace.Commands
{
    [ConsoleCommand("get-foo", "Test command", new string[] { })]
    public class GetFoo : ConsoleCommandBase, IConsoleCommand
    {
        public string ValidationMessage { get; }

        public void Init(string[] args, global::DotNetNuke.Entities.Portals.PortalSettings portalSettings, global::DotNetNuke.Entities.Users.UserInfo userInfo, int activeTabId)
        {
            Initialize(args, portalSettings, userInfo, activeTabId);
        }

        public bool IsValid()
        {
            return true;
        }

        public ConsoleResultModel Run()
        {
            return new ConsoleResultModel("Foo has completed") { };
        }
    }
}
