/*
 * Copyright (C) 2017 Jens Drescher, Germany
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

.pragma library

function fncPadZeros(number, size)
{
  number = number.toString();
  while (number.length < size) number = "0" + number;
  return number;
}


var arrayDataPoints =
[
    //{ heartrate: 140, elevation: 354.34, distance: 232 }
]


function fncAddDataPoint(heartrate,elevation,distance)
{
    var iPosition = arrayDataPoints.length;

    arrayDataPoints[iPosition] = new Object();
    arrayDataPoints[iPosition]["heartrate"] = heartrate;
    arrayDataPoints[iPosition]["elevation"] = elevation;
    arrayDataPoints[iPosition]["distance"] = distance;
}


//*************** Pebble functions *****************

var arrayPebbleValueTypes =
[
    { index: 0, fieldID: 0, value: "", header: qsTr("Empty") },
    { index: 1, fieldID: 0, value: "0", header: qsTr("Heartrate") },
    { index: 2, fieldID: 0, value: "0", header: qsTr("Heartrate") + "∅" },
    { index: 3, fieldID: 3, value: "0", header: qsTr("Pace") },
    { index: 4, fieldID: 0, value: "0", header: qsTr("Pace") + "∅" },
    { index: 5, fieldID: 0, value: "0", header: qsTr("Speed") },
    { index: 6, fieldID: 0, value: "0", header: qsTr("Speed") + "∅" },
    { index: 7, fieldID: 0, value: "0", header: qsTr("Altitude") },
    { index: 8, fieldID: 2, value: "0", header: qsTr("Distance") },
    { index: 9, fieldID: 0, value: "0", header: qsTr("Pause") },
    { index: 10, fieldID: 1, value: "0", header: qsTr("Duration") }
]

//Create lookup table for pebble value fields.
//This is a helper table to easier access the main table.
var arrayLookupPebbleValueTypesByFieldID = {};
fncGenerateHelperArray();

function fncGenerateHelperArray()
{
    for (var i = 0; i < arrayPebbleValueTypes.length; i++)
    {
        arrayLookupPebbleValueTypesByFieldID[arrayPebbleValueTypes[i].fieldID] = arrayPebbleValueTypes[i];
    }
}


function fncConvertSaveStringToArray(sSaveString)
{
    //"10,8,3"

    if (sSaveString === undefined || sSaveString === "")
        return;

    var arValueTypes = sSaveString.split(",");

    if (arValueTypes.length !== 3)    //This is the amount pebble fields
        return;

    arValueTypes[0] = parseInt(arValueTypes[0]);
    arValueTypes[1] = parseInt(arValueTypes[1]);
    arValueTypes[2] = parseInt(arValueTypes[2]);

    //Go through value types
    for (var i = 0; i < arrayPebbleValueTypes.length; i++)
    {
        if (i === arValueTypes[0])
            arrayPebbleValueTypes[i].fieldID = 1;
        else if (i === arValueTypes[1])
            arrayPebbleValueTypes[i].fieldID = 2;
        else if (i === arValueTypes[2])
            arrayPebbleValueTypes[i].fieldID = 3;
        else
            arrayPebbleValueTypes[i].fieldID = 0;
    }

    fncGenerateHelperArray();
}

function fncConvertArrayToSaveString()
{
    //"10,8,3"

    var sSaveString = "";

    sSaveString = arrayLookupPebbleValueTypesByFieldID[1].index.toString();
    sSaveString = sSaveString + arrayLookupPebbleValueTypesByFieldID[2].index.toString();
    sSaveString = sSaveString + arrayLookupPebbleValueTypesByFieldID[3].index.toString();

    return sSaveString;
}



