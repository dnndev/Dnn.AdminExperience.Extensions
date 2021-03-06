﻿using DotNetNuke.Services.Scheduling;
using Dnn.PersonaBar.Prompt.Common;

namespace Dnn.PersonaBar.Prompt.Models
{
    /// <summary>
    /// Represents a DNN ScheduleItem
    /// </summary>
    public class TaskModel : TaskModelBase
    {
        public string TypeName { get; set; }
        public bool CatchUp { get; set; }
        public string Created { get; set; }
        public string StartDate { get; set; }

        #region Constructors
        public TaskModel()
        {
        }
        public TaskModel(ScheduleItem item):base(item)
        {
            NextStart = item.NextStart.ToPromptLongDateString();
            CatchUp = item.CatchUpEnabled;
            Created = item.CreatedOnDate.ToPromptLongDateString();
            StartDate = item.ScheduleStartDate.ToPromptLongDateString();
            TypeName = item.TypeFullName;
        }
        #endregion
    }
}