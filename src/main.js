import "./index.css";

const todoDatas = [
  {
    content_id: 1,
    content: "測試資料",
    isCompleted: false,
  },
];

$(document).ready(function () {
  //TODO: 新增 TODO
  $("#create-item-form").submit(function (e) {
    e.preventDefault();
    updateItemToTodoDatas($("#item-creater").val());
    renderItems();
    $("#item-creater").val("");
  });

  //TODO: 刪除 TODO (single) -> 修改 renderItem 函式來解決

  //TODO: 改變 TODO 狀態 (active -> completed)

  //TODO: 顯示尚未完成 (active) 狀態的 TODO 數量
  $("#items-count");

  //TODO: 一鍵清除所有已完成 (completed) 狀態的 TODO
  $("clear-completed");

  //TODO: 切換顯示不同狀態 (All, Active, Completed) 的 TODO
  $('input[type="radio"]');

  renderItems();
});

function updateItemToTodoDatas(content) {
  todoDatas.push({
    content_id: new Date().getTime(),
    content: content,
    isCompleted: false,
  });
}

function renderItems() {
  $("#items").empty();
  todoDatas.forEach(function (data) {
    renderItem(data.content_id, data.content, data.isCompleted);
  });
}

function renderItem(content_id, content, isCompleted) {
  const template = $("#todo-list-item").html();
  const node = $(template);
  $(node).find("#todo-list-item-content").text(content);
  //TODO: 修改內部 attribute 設定 (label[for], input[id])
  $(node)
    .find("label")
    .attr("for", "todo-list-item" + content_id);
  $(node)
    .find("input")
    .attr("id", "todo-list-item" + content_id);
  //TODO: 按下 X 刪除 TODO 項目
  $(node)
    .find("#delete-btn")
    .click(function () {
      const index = todoDatas.findIndex(
        (data) => content_id === data.content_id
      );
      todoDatas.splice(index, 1);
      renderItems();
    });
  $("#items").prepend($(node));
}
