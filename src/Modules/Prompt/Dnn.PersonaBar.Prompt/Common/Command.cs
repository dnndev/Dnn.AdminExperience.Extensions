﻿using Dnn.PersonaBar.Prompt.Attributes;
using System;
using System.Runtime.Serialization;

namespace Dnn.PersonaBar.Prompt.Common
{
    [DataContract]
    public class Command
    {
        [DataMember]
        public string Key { get; set; }
        [DataMember]
        public string Name { get; set; }
        [DataMember]
        public string NameSpace { get; set; }
        [DataMember]
        public string Description { get; set; }
        [DataMember]
        public string AssemblyName { get; set; }
        [DataMember]
        public string Version { get; set; }
        public Type CommandType { get; set; }
        public ConsoleCommandAttribute CommandAttribute { get; set; }
    }
}