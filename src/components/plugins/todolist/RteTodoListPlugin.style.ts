export const todoListStyles = `.todo-list {
    margin: 0;
    display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
    line-height: 1.714rem;
  }
  .todo-list > li:before {
    background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%3E%20%3Cfilter%20id%3D%22blur%22%3E%20%3CfeGaussianBlur%20stdDeviation%3D%221%22%3E%3C%2FfeGaussianBlur%3E%20%3C%2Ffilter%3E%20%3Crect%20id%3D%22Rectangle%22%20fill%3D%22none%22%20width%3D%2215%22%20height%3D%2215%22%20x%3D%22.5%22%20y%3D%22.5%22%20fill-rule%3D%22nonzero%22%20stroke%3D%22%23C2C2C2%22%20rx%3D%223%22%20stroke-width%3D%221%22%3E%3C%2Frect%3E%20%3Crect%20id%3D%22Rectangle%22%20width%3D%2214%22%20height%3D%2214%22%20fill%3D%22%23FFF%22%20x%3D%221%22%20y%3D%221%22%20fill-rule%3D%22nonzero%22%20rx%3D%223%22%20filter%3D%22url(%23blur)%22%3E%3C%2Frect%3E%20%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-size: 100%;
    content: '';
    cursor: pointer;
    float: left;
    margin-top: 0.25em;
    margin-right: 0.5em;
    margin-left: -1.5em;
    height: 1em;
    width: 1em;
  }
  .todo-list > li {
    border-radius: 2px;
    list-style: none;
    padding: 0 60px 0 5px;
    position: relative;
  }
  .todo-list > li:hover {
    background: #e6e8eb;
  }
  .todo-list > li.todo-list-item.checked {
    text-decoration: line-through;
    text-decoration-color: #5d6d80;
    color: #767676;
  }
  .todo-list > li.todo-list-item.checked::before {
    background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20%3E%3Crect%20id%3D%22Rectangle%22%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22%233895FF%22%20fill-rule%3D%22nonzero%22%20rx%3D%223%22%20%2F%3E%3Cpath%20id%3D%22Path%22%20fill%3D%22%23FFF%22%20fill-rule%3D%22nonzero%22%20d%3D%22M11.5703186%2C3.14417309%20C11.8516238%2C2.73724603%2012.4164781%2C2.62829933%2012.83558%2C2.89774797%20C13.260121%2C3.17069355%2013.3759736%2C3.72932262%2013.0909105%2C4.14168582%20L7.7580587%2C11.8560195%20C7.43776896%2C12.3193404%206.76483983%2C12.3852142%206.35607322%2C11.9948725%20L3.02491697%2C8.8138662%20C2.66090143%2C8.46625845%202.65798871%2C7.89594698%203.01850234%2C7.54483354%20C3.373942%2C7.19866177%203.94940006%2C7.19592841%204.30829608%2C7.5386474%20L6.85276923%2C9.9684299%20L11.5703186%2C3.14417309%20Z%22%20%2F%3E%3C%2Fsvg%3E');
  }
  .todo-list .todo-list-item-panel {
    display: table;
    margin-top: 5px;
    float: right;
    max-height: 0px;
    position: absolute;
    top: 0;
    right: 0;
  }
  .todo-list-item-panel {
    display: none;
  }
  .assignee-button {
    display: table-cell;
    padding-left: 3px;
    padding-right: 3px;
    vertical-align: middle;
  }
  .assignee-button-img {
    height: 16px;
    width: 20px;
    display: block;
    background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20640%20512%22%20%3E%3Cpath%20d%3D%22M624%20208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8%200-16%207.2-16%2016v64h-64c-8.8%200-16%207.2-16%2016v32c0%208.8%207.2%2016%2016%2016h64v64c0%208.8%207.2%2016%2016%2016h32c8.8%200%2016-7.2%2016-16v-64h64c8.8%200%2016-7.2%2016-16v-32c0-8.8-7.2-16-16-16zm-400%2048c70.7%200%20128-57.3%20128-128S294.7%200%20224%200%2096%2057.3%2096%20128s57.3%20128%20128%20128zm89.6%2032h-16.7c-22.2%2010.2-46.9%2016-72.9%2016s-50.6-5.8-72.9-16h-16.7C60.2%20288%200%20348.2%200%20422.4V464c0%2026.5%2021.5%2048%2048%2048h352c26.5%200%2048-21.5%2048-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z%22%20%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .datepicker-button {
    display: table-cell;
    padding-left: 3px;
    padding-right: 3px;
    line-height: 1;
  }
  .datepicker-button-img {
    height: 16px;
    width: 16px;
    display: block;
    background-image: url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20448%20512%22%3E%20%3Cpath%20fill%3D%22currentColor%22%20d%3D%22M0%20464c0%2026.5%2021.5%2048%2048%2048h352c26.5%200%2048-21.5%2048-48V192H0v272zm320-196c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012h-40c-6.6%200-12-5.4-12-12v-40zm0%20128c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012h-40c-6.6%200-12-5.4-12-12v-40zM192%20268c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012h-40c-6.6%200-12-5.4-12-12v-40zm0%20128c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012h-40c-6.6%200-12-5.4-12-12v-40zM64%20268c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012H76c-6.6%200-12-5.4-12-12v-40zm0%20128c0-6.6%205.4-12%2012-12h40c6.6%200%2012%205.4%2012%2012v40c0%206.6-5.4%2012-12%2012H76c-6.6%200-12-5.4-12-12v-40zM400%2064h-48V16c0-8.8-7.2-16-16-16h-32c-8.8%200-16%207.2-16%2016v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8%200-16%207.2-16%2016v48H48C21.5%2064%200%2085.5%200%20112v48h448v-48c0-26.5-21.5-48-48-48z%22%3E%3C%2Fpath%3E%20%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  .datepicker-button .due-date--selected {
    white-space: nowrap;
    cursor: pointer;
    font-size: 12px;
    color: #5d6d80;
  }
  #cke-datepicker-instance {
    position: absolute;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    background: #fff;
    border: 1px solid #b6b6b6;
    border-bottom-color: #999;
    border-radius: 3px;
  }
  #cke-datepicker-instance.date-picker-button-hidden {
    left: -9999px !important;
    top: -9999px !important;
  }
  #cke-datepicker-instance .date-picker-caption {
    margin-top: 5px;
    padding: 5px 16px;
  }
  #cke-datepicker-instance .date-picker-selected,
  #cke-datepicker-instance .date-picker-default {
    padding: 5px 16px;
    display: flex;
    justify-content: space-between;
  }
  #cke-datepicker-instance .date-picker-selected span,
  #cke-datepicker-instance .date-picker-default span {
    display: inline-flex;
    align-items: center;
  }
  #cke-datepicker-instance .date-picker-default {
    padding-right: 0px;
  }
  #cke-datepicker-instance .date-picker-default--icon {
    margin-right: 4px;
  }
  #cke-datepicker-instance .date-picker-choose {
    padding: 5px 0px 5px 16px;
    display: flex;
    justify-content: flex-end;
  }
  #cke-datepicker-instance .date-picker-selected:hover,
  #cke-datepicker-instance .date-picker-choose:hover,
  #cke-datepicker-instance .date-picker-default:hover {
    background-color: #f5f5f5;
  }
  [data-type='assignee'] {
    display: inline-block;
  }
  .visual-meta-data {
    float: right;
  }
  
  .mce-offscreen-selection {
    position: absolute;
    left: -9999999px;
  }
  
  .li {
    padding: 0 5px;
  }`;
