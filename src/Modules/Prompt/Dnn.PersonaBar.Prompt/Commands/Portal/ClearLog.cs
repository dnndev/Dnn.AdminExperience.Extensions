﻿using Dnn.PersonaBar.Prompt.Attributes;
using Dnn.PersonaBar.Prompt.Common;
using Dnn.PersonaBar.Prompt.Interfaces;
using Dnn.PersonaBar.Prompt.Models;
using DotNetNuke.Common.Utilities;
using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Users;
using DotNetNuke.Services.Log.EventLog;
using System;

namespace Dnn.PersonaBar.Prompt.Commands.Host
{
    [ConsoleCommand("clear-log", "Clears the Event Log for the current portal", new string[] {})]
    public class ClearLog : ConsoleCommandBase, IConsoleCommand
{

    public string ValidationMessage { get; }

    public void Init(string[] args, PortalSettings portalSettings, UserInfo userInfo, int activeTabId)
    {
        Initialize(args, portalSettings, userInfo, activeTabId);
    }

    public bool IsValid()
    {
        return true;
    }

    public ConsoleResultModel Run()
    {

        try
        {
            EventLogController.Instance.ClearLog();
        }
        catch (Exception ex)
        {
            DotNetNuke.Services.Exceptions.Exceptions.LogException(ex);
            return new ConsoleErrorResultModel("An error occurred while attempting to clear the Event Log.");
        }
        return new ConsoleResultModel("Event Log Cleared") { };

    }


}

}
